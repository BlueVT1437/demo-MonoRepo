import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'mdm_vsl_cntr' })
export class VesselEntity {
  @PrimaryColumn({ name: 'VSL_CD' })
  vslCd: string;

  @Column({ name: 'VSL_CLSS_FLG', default: 'N', nullable: true })
  vslClssFlg: string;

  @Column({ name: 'VSL_ENG_NM', nullable: true })
  vslEngNm: string;

  @Column({ name: 'VSL_LOCL_NM', nullable: true })
  vslLoclNm: string;

  @Column({
    name: 'FOIL_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  foilCapa: number;

  @Column({
    name: 'DOIL_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  doilCapa: number;

  @Column({
    name: 'FRSH_WTR_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  frshWtrCapa: number;

  @Column({ name: 'CALL_SGN_NO', nullable: true })
  callSgnNo: string;

  @Column({ name: 'RGST_NO', nullable: true })
  rgstNo: string;

  @Column({ name: 'PHN_NO', nullable: true })
  phnNo: string;

  @Column({ name: 'FAX_NO', nullable: true })
  faxNo: string;

  @Column({ name: 'TLX_NO', nullable: true })
  tlxNo: string;

  @Column({ name: 'VSL_EML', nullable: true })
  vslEml: string;

  @Column({ name: 'PICLB_DESC', nullable: true })
  piclbDesc: string;

  @Column({ name: 'RGST_PORT_CD', nullable: true })
  rgstPortCd: string;

  @Column({ name: 'CLSS_NO_RGST_AREA_NM', nullable: true })
  clssNoRgstAreaNm: string;

  @Column({ name: 'VSL_CLSS_NO', nullable: true })
  vslClssNo: string;

  @Column({ name: 'VSL_BLDR_NM', nullable: true })
  vslBldrNm: string;

  @Column({
    name: 'LOA_LEN',
    type: 'numeric',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  loaLen: number;

  @Column({
    name: 'LBP_LEN',
    type: 'numeric',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  lbpLen: number;

  @Column({
    name: 'VSL_WDT',
    type: 'numeric',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  vslWdt: number;

  @Column({
    name: 'VSL_DPTH',
    type: 'numeric',
    precision: 6,
    scale: 3,
    nullable: true,
  })
  vslDpth: number;

  @Column({
    name: 'SMR_DRFT_HGT',
    type: 'numeric',
    precision: 8,
    scale: 3,
    nullable: true,
  })
  smrDrftHgt: number;

  @Column({
    name: 'DWT_WGT',
    type: 'numeric',
    precision: 9,
    scale: 3,
    nullable: true,
  })
  dwtWgt: number;

  @Column({
    name: 'LGT_SHP_TONG_WGT',
    type: 'numeric',
    precision: 9,
    scale: 3,
    nullable: true,
  })
  lgtShpTongWgt: number;

  @Column({
    name: 'GRS_RGST_TONG_WGT',
    type: 'numeric',
    precision: 9,
    scale: 3,
    nullable: true,
  })
  grsRgstTongWgt: number;

  @Column({
    name: 'NET_RGST_TONG_WGT',
    type: 'numeric',
    precision: 9,
    scale: 3,
    nullable: true,
  })
  netRgstTongWgt: number;

  @Column({
    name: 'PNM_GT_WGT',
    type: 'numeric',
    precision: 9,
    scale: 3,
    nullable: true,
  })
  pnmGtWgt: number;

  @Column({
    name: 'PNM_NET_TONG_WGT',
    type: 'numeric',
    precision: 9,
    scale: 3,
    nullable: true,
  })
  pnmNetTongWgt: number;

  @Column({
    name: 'SUZ_GT_WGT',
    type: 'numeric',
    precision: 9,
    scale: 3,
    nullable: true,
  })
  suzGtWgt: number;

  @Column({
    name: 'SUZ_NET_TONG_WGT',
    type: 'numeric',
    precision: 9,
    scale: 3,
    nullable: true,
  })
  suzNetTongWgt: number;

  @Column({ name: 'MN_ENG_MKR_NM', nullable: true })
  mnEngMkrNm: string;

  @Column({ name: 'MN_ENG_TP_DESC', nullable: true })
  mnEngTpDesc: string;

  @Column({
    name: 'MN_ENG_BHP_PWR',
    type: 'numeric',
    precision: 6,
    nullable: true,
  })
  mnEngBhpPwr: number;

  @Column({ name: 'VSL_OWN_IND_CD', nullable: true })
  vslOwnIndCd: string;

  @Column({ name: 'VSL_RGST_CNT_CD', nullable: true })
  vslRgstCntCd: string;

  @Column({ name: 'VSL_BLD_CD', nullable: true })
  vslBldCd: string;

  @Column({ name: 'CRR_CD', nullable: true })
  crrCd: string;

  @Column({ name: 'FDR_DIV_CD', nullable: true })
  fdrDivCd: string;

  @Column({
    name: 'VSL_SVC_SPD',
    type: 'numeric',
    precision: 5,
    scale: 3,
    nullable: true,
  })
  vslSvcSpd: number;

  @Column({
    name: 'MAX_SPD',
    type: 'numeric',
    precision: 5,
    scale: 3,
    nullable: true,
  })
  maxSpd: number;

  @Column({
    name: 'ECN_SPD',
    type: 'numeric',
    precision: 5,
    scale: 3,
    nullable: true,
  })
  ecnSpd: number;

  @Column({ name: 'CRW_KNT', type: 'numeric', precision: 5, nullable: true })
  crwKnt: number;

  @Column({
    name: 'CNTR_DZN_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  cntrDznCapa: number;

  @Column({
    name: 'CNTR_OP_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  cntrOpCapa: number;

  @Column({
    name: 'CNTR_PNM_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  cntrPnmCapa: number;

  @Column({
    name: 'CNTR_VSL_CLSS_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  cntrVslClssCapa: number;

  @Column({
    name: 'RF_RCPT_KNT',
    type: 'numeric',
    precision: 5,
    nullable: true,
  })
  rfRcptKnt: number;

  @Column({
    name: 'RF_RCPT_MAX_KNT',
    type: 'numeric',
    precision: 5,
    nullable: true,
  })
  rfRcptMaxKnt: number;

  @Column({
    name: 'FBD_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  fbdCapa: number;

  @Column({
    name: 'DPL_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  dplCapa: number;

  @Column({
    name: 'BLST_TNK_CAPA',
    type: 'numeric',
    precision: 18,
    scale: 3,
    nullable: true,
  })
  blstTnkCapa: number;

  @Column({
    name: 'FOIL_CSM',
    type: 'numeric',
    precision: 8,
    scale: 4,
    nullable: true,
  })
  foilCsm: number;

  @Column({
    name: 'DOIL_CSM',
    type: 'numeric',
    precision: 8,
    scale: 4,
    nullable: true,
  })
  doilCsm: number;

  @Column({
    name: 'FRSH_WTR_CSM',
    type: 'numeric',
    precision: 8,
    scale: 4,
    nullable: true,
  })
  frshWtrCsm: number;

  @Column({
    name: 'MN_ENG_RPM_PWR',
    type: 'numeric',
    precision: 6,
    nullable: true,
  })
  mnEngRpmPwr: number;

  @Column({
    name: 'GNR_RPM_PWR',
    type: 'numeric',
    precision: 6,
    nullable: true,
  })
  gnrRpmPwr: number;

  @Column({
    name: 'VSL_HGT',
    type: 'numeric',
    precision: 8,
    scale: 3,
    nullable: true,
  })
  vslHgt: number;

  @Column({ name: 'RGST_DT', type: 'date', nullable: true })
  rgstDt: Date;

  @Column({ name: 'VSL_EDI_NM', nullable: true })
  vslEdiNm: string;

  @Column({ name: 'CO_CD', nullable: true })
  coCd: string;

  @Column({ name: 'VSL_CLZ_DT', nullable: true })
  vslClzDt: string;

  @Column({ name: 'VSL_CRE_OFC_CD', nullable: true })
  vslCreOfcCd: string;

  @Column({ name: 'VSL_DELT_OFC_CD', nullable: true })
  vslDeltOfcCd: string;

  @Column({ name: 'VSL_BLD_AREA_NM', nullable: true, length: 500 })
  vslBldAreaNm: string;

  @Column({ name: 'GNR_MKR_NM', nullable: true })
  gnrMkrNm: string;

  @Column({ name: 'GNR_TP_DESC', nullable: true })
  gnrTpDesc: string;

  @Column({
    name: 'GNR_BHP_PWR',
    type: 'numeric',
    precision: 6,
    nullable: true,
  })
  gnrBhpPwr: number;

  @Column({ name: 'BWTHST_MKR_NM', nullable: true })
  bwthstMkrNm: string;

  @Column({ name: 'BWTHST_TP_DESC', nullable: true })
  bwthstTpDesc: string;

  @Column({
    name: 'BWTHST_BHP_PWR',
    type: 'numeric',
    precision: 6,
    nullable: true,
  })
  bwthstBhpPwr: number;

  @Column({
    name: 'BWTHST_RPM_PWR',
    type: 'numeric',
    precision: 6,
    nullable: true,
  })
  bwthstRpmPwr: number;

  @Column({ name: 'LLOYD_NO', nullable: true })
  lloydNo: string;

  @Column({ name: 'VSL_LNCH_DT', type: 'date', nullable: true })
  vslLnchDt: Date;

  @Column({ name: 'VSL_DE_DT', type: 'date', nullable: true })
  vslDeDt: Date;

  @Column({ name: 'VSL_KEL_LY_DT', type: 'date', nullable: true })
  vslKelLyDt: Date;

  @Column({ name: 'VSL_HL_NO', nullable: true })
  vslHlNo: string;

  @Column({
    name: 'TTL_TEU_KNT',
    type: 'numeric',
    precision: 18,
    scale: 5,
    nullable: true,
  })
  ttlTeuKnt: number;

  @Column({
    name: 'VSL_HTCH_KNT',
    type: 'numeric',
    precision: 5,
    nullable: true,
  })
  vslHtchKnt: number;

  @Column({
    name: 'VSL_HLD_KNT',
    type: 'numeric',
    precision: 5,
    nullable: true,
  })
  vslHldKnt: number;

  @Column({ name: 'VSL_RMK', nullable: true, length: 1000 })
  vslRmk: string;

  @Column({ name: 'INTL_TONG_CERTI_FLG', nullable: true })
  intlTongCertiFlg: string;

  @Column({
    name: 'MADN_VOY_SUZ_NET_TONG_WGT',
    type: 'numeric',
    precision: 9,
    scale: 3,
    nullable: true,
  })
  madnVoySuzNetTongWgt: number;

  @Column({ name: 'VSL_SFT_CSTRU_CERTI_EXP_DT', type: 'date', nullable: true })
  vslSftCstruCertiExpDt: Date;

  @Column({ name: 'VSL_SFT_RDO_CERTI_EXP_DT', type: 'date', nullable: true })
  vslSftRdoCertiExpDt: Date;

  @Column({ name: 'VSL_SFT_EQ_CERTI_EXP_DT', type: 'date', nullable: true })
  vslSftEqCertiExpDt: Date;

  @Column({ name: 'VSL_LOD_LINE_CERTI_EXP_DT', type: 'date', nullable: true })
  vslLodLineCertiExpDt: Date;

  @Column({ name: 'VSL_DERAT_CERTI_EXP_DT', type: 'date', nullable: true })
  vslDeratCertiExpDt: Date;

  @Column({ name: 'CRE_USR_ID', length: 100, nullable: false })
  creUsrId: string;

  @CreateDateColumn({ name: 'CRE_DT' })
  creDt: Date;

  @Column({ name: 'UPD_USR_ID', length: 100, nullable: false })
  updUsrId: string;

  @UpdateDateColumn({ name: 'UPD_DT' })
  updDt: Date;

  @Column({ name: 'DELT_FLG', default: 'N' })
  deltFlg: string;

  @Column({ name: 'EAI_EVNT_DT', type: 'date', nullable: true })
  eaiEvntDt: Date;

  @Column({ name: 'EAI_IF_ID', length: 32, nullable: true })
  eaiIfId: string;

  @Column({ name: 'MODI_VSL_CD', length: 30, nullable: true })
  modiVslCd: string;

  @Column({ name: 'EDW_UPD_DT', type: 'date', nullable: true })
  edwUpdDt: Date;

  @Column({ name: 'MODI_VSL_OPR_TP_CD', length: 30, nullable: true })
  modiVslOprTpCd: string;

  @Column({ name: 'MODI_OWNR_NM', length: 50, nullable: true })
  modiOwnrNm: string;

  @Column({ name: 'MODI_ALLN_VSL_CD', length: 6, nullable: true })
  modiAllnVslCd: string;

  @Column({ name: 'NYK_LGCY_VSL_CD_CTNT', length: 10, nullable: true })
  nykLgcyVslCdCtnt: string;

  @Column({ name: 'MOL_LGCY_VSL_CD_CTNT', length: 10, nullable: true })
  molLgcyVslCdCtnt: string;

  @Column({ name: 'KLINE_LGCY_VSL_CD_CTNT', length: 10, nullable: true })
  klineLgcyVslCdCtnt: string;

  @Column({ name: 'LGCY_CO_CD', length: 1, nullable: true })
  lgcyCoCd: string;
}
