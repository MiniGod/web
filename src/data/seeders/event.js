/* eslint-disable import/prefer-default-export */
import { Event, Group } from '../models';
import { log } from '../../logger';

export const up = async () => {
  log('Event: Seeding');

  await Event.sync();
  await Group.sync();

  const group = await Group.findOne({
    attributes: ['id'],
    where: {
      slug: 'community-1',
    },
  });

  await Event.bulkCreate(
    [0, 1].map(i => ({
      name: `Event ${i}`,
      slug: `event-${i}`,
      briefing:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere vestibulum diam ut tristique. Maecenas rutrum tristique vulputate.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere vestibulum diam ut tristique. Maecenas rutrum tristique vulputate. Mauris eleifend elit sed mollis tristique. Proin ut sodales purus. Vivamus ac pretium metus. Etiam quam purus, volutpat posuere nibh at, egestas aliquam lectus. Maecenas convallis eros et lacus scelerisque, a accumsan sapien dictum. Mauris leo ex, pharetra ut metus sit amet, efficitur commodo erat. Phasellus vel feugiat est. Ut accumsan sapien orci, non sodales nibh euismod vel. Phasellus pellentesque felis ante, vel condimentum diam vehicula et.',
      location: 'University Of Reykjavik',
      geolocation: { type: 'Point', coordinates: [64.1237301, -21.926889] },
      startTime: new Date(2017, 11, 19, 19),
      endTime: new Date(2017, 11, 19, 21),
      groupId: group.id,
    })),
  );

  log('Event: Done seeding');
};

export const down = async () => {
  log('Event: Flushing');

  await Event.sync();

  await Event.truncate();

  log('Event: Done Flushing');
};
