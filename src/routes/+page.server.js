import fs from "fs";
import csv from "csv-parser";

export const load = async () => {
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

    return { message: JSON.stringify(results) };
};