import { Error } from "mongoose";
import KafkaConfig from "../../../config/kafka.config";
import Comment from "../../../models/Comments.model";
import logger from "../../../utils/logger";
import { kafka_topics } from "../kafka_topics";










interface CommentMesage {
    _id : string;
    post_id : string;
    comment : string;
    author : string;
    likes : number;
    dislikes : number;
    parent_id : string;
    replies : string[];
}


const CreateCommentConsumer = async () => {
    const messages: any[] = [];
    let processing = false;
    

    try {
        await KafkaConfig.createConsumer('create_comment_consumer_group', [kafka_topics.createComment], async ({ topic, partition, message }) => {
            if (!message.value) {
                logger.error("CreateCommentConsumer()::Received message with undefined value:", message);
                return;
            }

            const parsedMessage = JSON.parse(message.value.toString());

            messages.push(parsedMessage);

            if (messages.length > 100 && !processing) {
                await processMessages(messages, processing);
            }


            setInterval(async () => {
                if (!processing) {
                    await processMessages(messages, processing);
                }
            }, 5000);
        })
    } catch (error) {
        logger.error("Error consuming [create-comment] message", error);    

    }
    
}




async function processMessages(messages: CommentMesage[], processing: boolean) {
    if (messages.length > 0) {
        processing = true;

        const batchToProcess = [...messages];
        messages.length = 0;

        try {
            const uniqueComments = await filterUniqueComments(batchToProcess);
            if (uniqueComments.length > 0) {
                const bulkOps = uniqueComments.map(comment => ({
                    updateOne: {
                        filter: { _id: comment._id },
                        update: { $set: comment },
                        upsert: true
                    }
                }));
                await Comment.bulkWrite(bulkOps);
                logger.info(`${uniqueComments.length} messages processed successfully`);
            }
        } catch (error : Error | any) {   
            if (error.name === 'MongoBulkWriteError' && error.code === 11000) {
                const bulkWriteError = error as any & { writeErrors?: Array<{ err: { op: { _id: string } } }> };
                const failedIds = bulkWriteError.writeErrors?.map((err : any) => err.err.op._id) || [];
                logger.warn(`Duplicate comments detected: ${failedIds.join(', ')}`);

                // Remove the duplicate messages from the batch
                const nonDuplicateMessages = batchToProcess.filter(comment => !failedIds.includes(comment._id));
                
                if (nonDuplicateMessages.length > 0) {
                    // Only retry non-duplicate messages
                    await processMessages(nonDuplicateMessages, processing);
                }
            } else {
                logger.error("Error processing messages:", error);
                // Re-add messages to the queue if there was a non-duplicate error
                messages.push(...batchToProcess);
            }
        } finally {
            processing = false;
        }
    }
}
async function filterUniqueComments(comments: CommentMesage[]): Promise<CommentMesage[]> {
    const commentIds = comments.map(comment => comment._id);
    const existingComments = await Comment.find({ _id: { $in: commentIds } }).select('_id');
    const existingCommentIds = new Set(existingComments.map(comment => comment._id.toString()));

    return comments.filter(comment => !existingCommentIds.has(comment._id));
}


// async function processMessages(messages: any[], processing: boolean) {
//     if (messages.length > 0) {
//         processing = true;

//         const batchToProcess = [...messages];
//         messages.length = 0;

//         try {
//             const uniqueComments = await filterUniqueComments(batchToProcess);
//             if (uniqueComments.length > 0) {
//                 await Comment.insertMany(uniqueComments);
//                 logger.info("Messages saved to database, bulk insert successfully");
//             }
//         } catch (error : Error | any) {   

//             if(error.name === 'MongoBulkWriteError' && error.code === 11000){
//                 logger.warn(`Duplicate comments detected: ${error.writeErrors.map((err : any) => err.err.op._id).join(', ')}`);

//                 // Re-add messages to the queue if there was a duplicate error
//                 const nonDuplicateMessages = batchToProcess.filter((comment : any) => !error.writeErrors.some((err : any) => err.err.op._id === comment._id));
//                 if(nonDuplicateMessages.length > 0){
//                     messages.push(...nonDuplicateMessages);
//                 }
//             }
//             else{
//                 logger.error("Error saving messages to database", error);
//                 messages.push(...batchToProcess);  // Re-add messages to the queue if there was an error
//             }

//         } finally {
//             processing = false;
//         }
//     }
// }




// async function filterUniqueComments(comments: any[]) {
//     const commentIds = comments.map(comment => comment._id);
//     const existingComments = await Comment.find({ _id: { $in: commentIds } }).select('_id');
//     const existingCommentIds = new Set(existingComments.map(comment => comment._id));

//     return comments.filter(comment => !existingCommentIds.has(comment._id));
// }

export default CreateCommentConsumer;
