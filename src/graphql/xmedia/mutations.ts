import { XMediaType, RemoveXMediaInputType } from '../../db/XMediaTypes'
import { getXMediaModel } from '../../db/XMediaSchema.js'
import muid from 'uuid-mongodb'

const XMediaMutations = {
  // addXMedia
  addXMedia: async (_: any, { input }: {input: XMediaType}) => {
    const XMediaModel = getXMediaModel()
    const newXMedia = new XMediaModel({
      ...input,
      userId: muid.from(input.userId),
      mediaUuid: muid.from(input.mediaUuid)
    })
    const res = await XMediaModel.create(newXMedia)
    return { xMediaId: res.id }
  },

  // removeXMedia
  removeXMedia: async (_: any, { input }: {input: RemoveXMediaInputType}) => {
    const XMediaModel = getXMediaModel()
    const res = await XMediaModel.deleteOne({ _id: input.xMediaId })
    return { numDeleted: res.deletedCount }
  }
}

export default XMediaMutations
