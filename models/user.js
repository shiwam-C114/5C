const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: { type: String, trim: true, default: "" },
    id: { type: Number, trim: true, default: "" },
    node_id: { type: String, trim: true, default: "" },
    avatar_url: { type: String, trim: true, default: "" },
    gravatar_id: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
    html_url: { type: String, trim: true, default: "" },
    followers_url: { type: String, trim: true, default: "" },
    following_url: { type: String, trim: true, default: "" },
    gists_url: { type: String, trim: true, default: "" },
    starred_url: { type: String, trim: true, default: "" },
    subscriptions_url: { type: String, trim: true, default: "" },
    organizations_url: { type: String, trim: true, default: "" },
    repos_url: { type: String, trim: true, default: "" },
    events_url: { type: String, trim: true, default: "" },
    received_events_url: { type: String, trim: true, default: "" },
    type: { type: String, trim: true, default: "" },
    site_admin: { type: String, trim: true, default: true },
    name: { type: String, trim: true, default: "" },
    company: { type: String, trim: true, default: "" },
    blog: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, default: true },
    hireable: { type: String, trim: true, default: true },
    bio: { type: String, trim: true, default: true },
    twitter_username: { type: String, trim: true, default: true },
    public_repos: { type: Number, trim: true, default: "" },
    public_gists: { type: Number, trim: true, default: "" },
    followers: { type: Number, trim: true, default: "" },
    following: { type: Number, trim: true, default: "" },
    created_at: { type: String, trim: true, default: "" },
    updated_at: { type: String, trim: true, default: "" }
})


module.exports = mongoose.model("User", userSchema)