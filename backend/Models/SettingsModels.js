//import connection
import db from "../Config/database.js";

//get all settings
export const getSettings = (result) => {
  db.query("SELECT * FROM settings ORDER BY setting_key", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

//get single setting by key
export const getSettingByKey = (key, result) => {
  db.query("SELECT * FROM settings WHERE setting_key = ?", [key], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

//update setting
export const updateSetting = (key, value, result) => {
  db.query(
    "UPDATE settings SET setting_value = ? WHERE setting_key = ?",
    [value, key],
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

//update multiple settings at once
export const updateMultipleSettings = (settings, result) => {
  // Start transaction
  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return result(err, null);
    }

    let completedUpdates = 0;
    const totalUpdates = settings.length;

    if (totalUpdates === 0) {
      return db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            result(err, null);
          });
        }
        result(null, { message: "No settings to update" });
      });
    }

    settings.forEach((setting) => {
      db.query(
        "UPDATE settings SET setting_value = ? WHERE setting_key = ?",
        [setting.value, setting.key],
        (err, updateResult) => {
          if (err) {
            return db.rollback(() => {
              console.log(err);
              result(err, null);
            });
          }

          completedUpdates++;

          if (completedUpdates === totalUpdates) {
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  console.log(err);
                  result(err, null);
                });
              }
              result(null, { message: "Settings updated successfully" });
            });
          }
        }
      );
    });
  });
};

//get settings as object (key-value pairs)
export const getSettingsObject = (result) => {
  db.query("SELECT setting_key, setting_value FROM settings", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      // Convert array to object
      const settingsObj = {};
      results.forEach((row) => {
        settingsObj[row.setting_key] = row.setting_value;
      });
      result(null, settingsObj);
    }
  });
};

