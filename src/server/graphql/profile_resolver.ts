import { Profile } from '../../model/profile';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const profileResolver: GraphQLModelResolver<Profile> = {
  avatar: async (parent) => {
    const profile = await dataSource.manager.findOneOrFail(Profile, {
      cache: true,
      relations: {
        avatar: true,
      },
      where: { id: parent.id },
    });

    return profile.avatar;
  },
};
