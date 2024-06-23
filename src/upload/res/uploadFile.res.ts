export interface UploadFileRes {
  files: File[];
  // 용지 크기 (ms_a4 - A4용지)
  media_size?: 'ms_a4' | 'ms_a3';
  //용지 종류 (mt_plainpaper - )
  media_type?: 'mt_plainpaper';
  //인쇄시 테투리 인쇄 설정 (false - 테투리있는 인쇄)
  borderless?: boolean;
  //인쇄 품질 (normal - 보통)
  print_quality?: 'normal';
  //급지 방법 (front2 - 전면 2번째 용지함)
  source?: 'front1' | 'front2';
  //색상모드 (mono - 흑백)
  color_mode?: 'mono' | 'color';
  //양면인쇄 (none - 단면인쇄)
  '2_sided'?: 'none';
  //역순인쇄 (false - 첫페이지부터 인쇄)
  reverse_order?: boolean;
  //사본인쇄 (1 - 기본 설정, 1부만 인쇄)
  copies?: number;
  //묶음 인쇄 방법 (true - 세트로 인쇄, false - 페이지별 인쇄)
  collate?: boolean;
  page_cnt?: number;
}
