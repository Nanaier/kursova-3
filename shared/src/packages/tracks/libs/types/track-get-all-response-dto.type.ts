import { type TrackGetAllItemResponseDto } from './track-get-all-item-response-dto.type.js';

type TrackGetAllResponseDto = {
  items: { items: TrackGetAllItemResponseDto[] };
  totalItems: number;
  totalPages: number;
};

export { type TrackGetAllResponseDto };
