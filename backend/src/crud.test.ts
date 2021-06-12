import request from "supertest";
import app from "./index";

describe("Get all Blog Posts", () => {
  it("/blog should return all the blog posts", async () => {
    const result = await request(app).get("/blog").send();

    expect(result.status).toBe(200);
    expect(Array.isArray(result.body)).toBe(true);
  });
});

describe("Create a new Post", () => {
  it("Should create a new blog post", async () => {
    const title =
      "Cubilia mattis sociosqu luctus eget pretium nostra dis netus sociis";
    const description =
      "Lorem ipsum dolor sit amet consectetur, adipiscing elit felis interdum, parturient placerat mauris suspendisse. Cubilia mattis sociosqu luctus eget pretium nostra dis netus sociis, eleifend scelerisque etiam natoque enim semper euismod blandit pharetra himenaeos, turpis leo mus non curae pulvinar accumsan urna. Habitant elementum leo nec fames mus facilisi aliquet rhoncus metus, montes blandit tempus non lectus cum litora dignissim, lacus per fermentum vivamus platea hac curabitur porttitor.";
    const result = await request(app).post("/blog/new").send({
      title,
      description,
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("title", title);
    expect(result.body).toHaveProperty("description", description);
    expect(result.body).toHaveProperty("_id");
  });
});
