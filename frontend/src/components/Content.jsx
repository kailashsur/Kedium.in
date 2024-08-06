

function Content({content}) {
    return (
        <section className="my-4 w-full md:w-[680px] font-Charter text-lg leading-relaxed">

            <div dangerouslySetInnerHTML={{ __html: content }} className="mt-4" />
        </section>
    )
}

export default Content;