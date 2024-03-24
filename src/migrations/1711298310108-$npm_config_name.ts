import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1711298310108 implements MigrationInterface {
  name = ' $npmConfigName1711298310108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorit_album_entity" DROP CONSTRAINT "FK_d804585e8c9c280f476eb2eadcf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorit_album_entity" DROP CONSTRAINT "REL_d804585e8c9c280f476eb2eadc"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorit_album_entity" ADD CONSTRAINT "REL_d804585e8c9c280f476eb2eadc" UNIQUE ("albumId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorit_album_entity" ADD CONSTRAINT "FK_d804585e8c9c280f476eb2eadcf" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
