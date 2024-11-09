import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunkPipe',
})
export class ChunkPipePipe implements PipeTransform {
  transform(array: any, chunkSize: number): any[][] {
    if (!array) return [];
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
