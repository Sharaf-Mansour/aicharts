 export const load = async () => {
 const results = await fetch("https://dcqdjk5v2twralik.public.blob.vercel-storage.com/Kpfrom2016-Y1r74tJK23PuwEQ3oSOp8Sdk1B2lO9.json").then((res) => res.json()).then((data) => data);
    return { message: JSON.stringify(results) };
};