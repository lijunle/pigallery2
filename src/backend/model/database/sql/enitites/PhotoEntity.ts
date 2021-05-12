import {ChildEntity, Column, Index} from 'typeorm';
import {CameraMetadata, GPSMetadata, PhotoDTO, PhotoMetadata, PositionMetaData} from '../../../../../common/entities/PhotoDTO';
import {MediaEntity, MediaMetadataEntity} from './MediaEntity';
import {columnCharsetCS} from './EntityUtils';

export class CameraMetadataEntity implements CameraMetadata {

  @Column('int', {nullable: true, unsigned: true})
  ISO: number;

  @Column('text', {nullable: true})
  @Column(columnCharsetCS)
  model: string;

  @Column('text', {nullable: true})
  @Column(columnCharsetCS)
  make: string;

  @Column('float', {nullable: true})
  fStop: number;

  @Column('float', {nullable: true})
  exposure: number;

  @Column('float', {nullable: true})
  focalLength: number;

  @Column('text', {nullable: true})
  lens: string;
}


export class GPSMetadataEntity implements GPSMetadata {

  @Column('float', {nullable: true})
  latitude: number;
  @Column('float', {nullable: true})
  longitude: number;
  @Column('int', {nullable: true})
  altitude: number;
}


export class PositionMetaDataEntity implements PositionMetaData {

  @Column(type => GPSMetadataEntity)
  GPSData: GPSMetadataEntity;

  @Index()
  @Column('text', {nullable: true})
  @Column(columnCharsetCS)
  country: string;

  @Index()
  @Column('text', {nullable: true})
  @Column(columnCharsetCS)
  state: string;

  @Index()
  @Column('text', {nullable: true})
  @Column(columnCharsetCS)
  city: string;
}


export class PhotoMetadataEntity extends MediaMetadataEntity implements PhotoMetadata {
  /*
    @Column('simple-array')
    keywords: string[];

    @Column(type => CameraMetadataEntity)
    cameraData: CameraMetadataEntity;

    @Column(type => PositionMetaDataEntity)
    positionData: PositionMetaDataEntity;

    @Column('tinyint', {default: OrientationTypes.TOP_LEFT})
    orientation: OrientationTypes;
  */
}


@ChildEntity()
export class PhotoEntity extends MediaEntity implements PhotoDTO {
  @Column(type => PhotoMetadataEntity)
  metadata: PhotoMetadataEntity;
}
