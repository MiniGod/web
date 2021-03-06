import DataType from 'sequelize';
import Model from '../db';

const UserTopic = Model.define('user_topic', {
  userId: {
    type: DataType.UUID,
  },
  topicId: {
    type: DataType.UUID,
  },
  order: {
    type: DataType.NUMERIC(),
  },
  createdAt: DataType.DATE,
  updatedAt: DataType.DATE,
});

export default UserTopic;
