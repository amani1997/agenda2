import db from '../db/users'

class entriesService {
    createEntries = async (values) => {
        const text = `INSERT INTO  entries ( title,createdon, description)
        VALUES ($1, $2, $3)
        RETURNING *`;
        try {
           const  newEntries  = await db.execute(text, values);
          const { rows } = newEntries;
           return rows;
        } catch(err) {
         console.log(`error accured in service ${err}`);
        }
      } 
    updateEntries = async (value) => {
        const updateOne =`UPDATE entries
          SET title=$1, description=$2
          WHERE id=$3 returning *`;
        try {
      const { rows } = await db.execute(updateOne, value);
          return rows[0];
        } catch(err) {
         console.log(`error accured in service ${err}`);
        }
      }
    delete = async (id) => {
        const deleteQuery = 'DELETE FROM entries WHERE id=$1 returning *';
        try {
          const { rows } = await db.execute(deleteQuery, [id]);
          return rows[0];
        } catch(error) {
          console.log(`error accured in service ${error}`);
        }
      }
      getAllService = async () => {
        const findAll = 'SELECT * FROM entries';
        try {
          const { rows } = await db.execute(findAll);
          const allEntries = rows.map(entries => {
            const {password, ...entriesInfo} = entries;
            return entriesInfo;
        });
        return allEntries;
        } catch(error) {
          return console.log(`error accured in service ${error}`);
        }
      }
      getOneService = async (id) => {
        const text = 'SELECT * FROM entries WHERE id = $1';
        try {
          const { rows } = await db.execute(text, [id]);
          return rows[0];
        } catch(error) {
          return console.log(`error accured in service ${error}`);
        }
      }
    }
export default new entriesService();