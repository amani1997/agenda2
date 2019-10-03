import service from '../services/entriesService'
import moment from 'moment';
import 'idempotent-babel-polyfill';

class putInEntries {
  fillEntries = async (req, res) => {
    try {
      const { title, description} = req.body;
      const value = [
        title,moment(new Date()), description
      ];
       const newEntries = await service.createEntries(value);
        return res.status(201).send({
          status: 201,
          message: "enties created successful",
          data: newEntries
        });
    } catch (error) {
      return res.status(403).send({
        status: 403,
        error: `you do not have access to this service ${error}`
      });
    }
  }
  update = async (req, res) => {
    try {
      const { title, description} = req.body;
      const value = [
        title,description,req.params.entryid
      ];
      const {createdon, ...newEntries} = await service.updateEntries(value);
      return res.status(200).send({
           status: 200,
           message: 'entry successfully edited',
           data: newEntries
      });
    } catch(err) {
      res.status(404).send({
        status: 404,
        error: 'id you are trying to find is not found',
      });
    }
  }
  async delete(req, res) {
    try {
      const newEntries = await service.delete(req.params.entryid);
      if(!newEntries) {
        return res.status(404).send({
          status: 404,
          error : 'entry not found'
        });
      }
      return res.status(200).send({
        status: 200,
        data:{
          message : 'entry successfully deleted'
        }
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
  getAllEntries = async (req, res) => {
    try {
    const allEntries = await service.getAllService();
    if(!allEntries){
      return res.status(404).send({
        status: 404,
          error: 'you do not have any entries now'
     });
    }
      return res.status(200).send({
        status: 200,
          data: allEntries
     });
    } catch(error) {
      return res.status(500).send({
        status: 500,
        error: `something went wrong  ${error} `
      });
    }
  }
  getOneEntries = async (req, res) => {
    try {
      const oneEntries = await service.getOneService(req.params.entryid);
      if (!oneEntries) {
        return res.status(403).send({
          status: 403,
          error: "entries you try to access is not found"
        });
      }
      return res.status(200).send({
        status: 200,
        data: oneEntries
     });
    } catch(error) {
      return res.status(404).send({
        status: 404,
        error: `something goes wrong ${error}`
      });
    }
  }
}
export default new putInEntries();