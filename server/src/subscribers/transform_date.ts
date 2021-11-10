/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs from 'dayjs'
import { EntitySubscriberInterface, EventSubscriber, LoadEvent } from 'typeorm'

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {
  afterLoad (event: LoadEvent<any>) {
    if ((event as any).created_at) {
      (event as any).created_at = dayjs((event as any).created_at).format('YYYY-MM-DD HH:mm:ss')
    }
    if ((event as any).updated_at) {
      (event as any).updated_at = dayjs((event as any).updated_at).format('YYYY-MM-DD HH:mm:ss')
    }
    if ((event as any).start_at) {
      (event as any).start_at = dayjs((event as any).start_at).format('YYYY-MM-DD HH:mm:ss')
    }
    if ((event as any).finish_at) {
      (event as any).finish_at = dayjs((event as any).finish_at).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
