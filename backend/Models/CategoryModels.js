//import connection
import db from "../Config/database.js";

//get all categories
export const getCategories = (result) => {
  db.query("SELECT * FROM categories ORDER BY category_name", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

//get single category
export const getCategoryById = (id, result) => {
  db.query(
    "SELECT * FROM categories WHERE category_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

//insert category to database
export const insertCategory = (data, result) => {
  db.query("INSERT INTO categories SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// Update Category in Database
export const updateCategoryById = (data, id, result) => {
  db.query(
    "UPDATE categories SET category_name = ? WHERE category_id = ?",
    [data.category_name, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// Delete Category from Database
export const deleteCategoryById = (id, result) => {
  db.query("DELETE FROM categories WHERE category_id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

