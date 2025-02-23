import fileSystem from "fs";

function fetchData() {
    try {
        const data = fileSystem.readFileSync('./data.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getPosts(req, res) {
    try {
        const blogs = await fetchData();
        console.log("Fetching blog posts");
        res.render('home', { blogs });
    } catch (error) {
        res.status(500).send("Error retrieving blog posts");
    }
}

async function getPostById(req, res) {
    const id = req.params.id;
    try {
        const blogs = await fetchData();
        const blog = blogs.find(blog => blog.id === id);
        if (!blog) return res.status(404).send("Post not found");
        res.render('../views/post.ejs', { blog });
    } catch (error) {
        res.status(500).send("Error retrieving blog post");
    }
}

async function addPost(req, res) {
    try {
        const blogs = fetchData();
        const newBlog = {
            ...req.body,
            id: Date.now().toString() // Generate unique ID
        };
        blogs.push(newBlog);
        fileSystem.writeFileSync('./data.json', JSON.stringify(blogs, null, 2));
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error adding blog post");
    }
}

export { getPosts, getPostById, addPost };