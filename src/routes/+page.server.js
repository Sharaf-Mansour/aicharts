import fs from "fs";
import csv from "csv-parser";

export const load = async () => {
    const results = [];

    await new Promise((resolve, reject) => {
        fs.createReadStream("server/Kpfrom2016.csv")
            .pipe(csv())
            .on("data", (data) => {
                results.push(data);
            })
            .on("end", () => {
                resolve();
            })
            .on("error", (error) => {
                reject(error);
            });
    });

    return { message: JSON.stringify(results) };
};

export const actions = {
    create: async ({ cookies, request }) => {
    //     const {text} = Object.fromEntries(await request.formData());
    //  //   const query = db.prepare('INSERT INTO ListTable (Title, Price, Note) VALUES ($title, $price, $note)');
    //  //   query.run(title, price, note);
    //  const response = await fetch("http://localhost:8080/my-endpoint", {
    //     method: "POST",
    //     headers: {
    //     "Content-Type": "text/plain",
    //     },
    //     body:  text ,
    //   });
  
    //   if (!response.ok) {
    //     throw new Error("Failed to fetch");
    //   }
    //   const results = await response.text();
    const results = [];

    await new Promise((resolve, reject) => {
        fs.createReadStream("static/Kpfrom2016.csv")
            .pipe(csv())
            .on("data", (data) => {
                results.push(data);
            })
            .on("end", () => {
                resolve();
            })
            .on("error", (error) => {
                reject(error);
            });
    });
    //console.log(results);
      return { message: JSON.stringify(results) };

    }   
}