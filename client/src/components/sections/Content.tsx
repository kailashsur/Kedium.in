import style from "./content.module.css"

function Content({content} : {content: string}) {
    return (
        <section className={`dark:bg-primary-dart-background dark:text-primary-dark-text my-4 w-full md:w-[680px] text-lg leading-relaxed ${style.blog}`}>

            <article dangerouslySetInnerHTML={{ __html: content }} className="mt-4" />
        </section>
    )
}

export default Content;