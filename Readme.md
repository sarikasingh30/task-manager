# Notes


```
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useCreateIndex: true,                               
            useFindAndModify: false,
            useUnifiedTopology: true,
          })
        console.log("Connected to the database")
    } catch (error) {
        console.log(error)
    }
}

```

The second parameter is an options object:

useNewUrlParser: This option is set to true to opt-in to using the MongoDB driver's new connection string parser.

useCreateIndex: This option is set to true to use createIndex() instead of ensureIndex() for index creation. This is the recommended way to create indexes in MongoDB.

useFindAndModify: This option is set to false to opt-out of using the deprecated findAndModify() function in MongoDB.

useUnifiedTopology: This option is set to true to opt-in to using the MongoDB driver's new Server Discovery and Monitoring engine. It's recommended for new applications to set this to true as it enables the use of the new connection monitoring engine.


