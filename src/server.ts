import app from "./app";

app.listen(process.env.PORT, () => {
  console.log(`Media service is running on port ${process.env.PORT}`);
});
