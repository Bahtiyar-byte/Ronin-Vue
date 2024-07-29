import type Job from '@/types/jobs/Job'
import type Entity from '@/types/common/Entity'

export default interface Document extends Entity {
  name?: string | null
  related_jobId?: string | null
  related_job: Job | string
}
