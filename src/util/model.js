class Information{
    /**
     * 
     * @param {string} id The identifier of the model
     * @param {string} title The title of the application 
     * @param {string} description The description of the application 
     * @param {JSX} icon The icon of the card
     * @param {string} sourceLink A link to the source for the model
     */
    constructor(id, title, description, icon, sourceLink ){
        this.id = id;
        this.title = title;
        this.icon = icon
        this.description = description;
        this.sourceLink = sourceLink;
    }
}
class Model extends Information{
    /**
     * 
     * @param {string} id The identifier of the model
     * @param {string} title The title of the application 
     * @param {string} description The description of the application 
     * @param {JSX} icon The icon of the card
     * @param {string} sourceLink A link to the source for the model
     * @param {*} tags A list of tags, if any
     */
    constructor(id, title, description, icon, sourceLink, tags ){
        super(id, title,description,icon,sourceLink)
        this.tags = tags
    }
}

export {Model, Information};