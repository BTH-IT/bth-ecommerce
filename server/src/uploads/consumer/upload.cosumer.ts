import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('upload-file')
export class UploadConsumer {
  @Process('single')
  async uploadSigleFile(job: Job<unknown>) {
    console.log(job.data);
  }
}
