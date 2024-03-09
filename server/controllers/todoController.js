const connection = require("../db/connector");

exports.createTodo = async (req, res) => {
  try {
    const content = req.body.content;
    await connection
      .promise()
      .query(
        `insert into todo (content, completed) values('${content}', false)`
      );
    return res.status(200).send("Success");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.getTodos = async (req, res) => {
  try {
    const [rows, fields] = await connection
      .promise()
      .query(`select * from todo`);
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.updateTodo = async (req, res) => {
  try {
    await connection
      .promise()
      .query(
        `update todo set completed = ${req.body.completed} where id = ${req.body.id}`
      );
    return res.status(200).json("success");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await connection
      .promise()
      .query(`delete from todo where id = ${req.body.id}`);
    return res.status(200).json("success");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

// exports.initId = async (req, res) => {
//   try {
//     await connection.promise().query(`alter table todo auto_increment = 1;`);
//     return res.status(200).json("success");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Server Error");
//   }
// };
