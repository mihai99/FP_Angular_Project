

export interface listDetail {
    visibility:  String,
    id: String,
    description: String,
    name: String,
    category: String,
    items: Array<String>,
    likes: Number,
    owner: String,
    dateAdded: Date
}



export interface listDetailActive {
    visibility:  String,
    id: String,
    description: String,
    name: String,
    category: String,
    items: Array<String>,
    likes: Number,
    owner: String,
    dateAdded: Date,
    active: Boolean
}