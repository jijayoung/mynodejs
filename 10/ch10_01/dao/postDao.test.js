const postDao = require('./postDao');

describe("Test post DAO", () => {
    test("createPost Test", async () => {
        const data = {
            title: "Jest Test",
            content: "jest Test",
            userId: 1
        }
        const result = await postDao.createPost(data);
        expect(result.title).toBe(data.title);
    });

    test("updatePost Test", async () => { 
        //expect(result.length).toBe(data.length);

    })
})