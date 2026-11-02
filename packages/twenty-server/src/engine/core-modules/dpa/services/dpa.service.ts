import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FileFolder } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { Repository } from 'typeorm';

import { DpaDocumentDTO } from 'src/engine/core-modules/dpa/dtos/dpa-document.dto';
import { type GenerateSignedDpaInput } from 'src/engine/core-modules/dpa/dtos/generate-signed-dpa.input';
import { type GenerateSignedDpaResult } from 'src/engine/core-modules/dpa/dtos/generate-signed-dpa.result';
import { DpaAgreementEntity } from 'src/engine/core-modules/dpa/entities/dpa-agreement.entity';
import { FileUrlService } from 'src/engine/core-modules/file/file-url/file-url.service';
import { type WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

@Injectable()
export class DpaService {
  constructor(
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    @InjectRepository(DpaAgreementEntity)
    private readonly dpaAgreementRepository: Repository<DpaAgreementEntity>,
    private readonly fileUrlService: FileUrlService,
  ) {}

  getPreviewForWorkspace(
    _workspace: Pick<WorkspaceEntity, 'id'>,
  ): DpaDocumentDTO {
    throw new BadRequestException(
      'Ownward Labs has not published a Data Processing Agreement for this service.',
    );
  }

  async listAgreements(workspaceId: string): Promise<DpaAgreementEntity[]> {
    return this.dpaAgreementRepository.find({
      where: { workspaceId },
      order: { createdAt: 'DESC' },
    });
  }

  async getDownloadUrl(
    agreement: Pick<DpaAgreementEntity, 'signedFileId'>,
    workspaceId: string,
  ): Promise<string | null> {
    if (!isDefined(agreement.signedFileId)) {
      return null;
    }

    return this.fileUrlService.signFileByIdUrl({
      fileId: agreement.signedFileId,
      workspaceId,
      fileFolder: FileFolder.Dpa,
    });
  }

  async generateSignedDpa(_args: {
    workspace: Pick<WorkspaceEntity, 'id'>;
    userId: string;
    userEmail: string;
    input: GenerateSignedDpaInput;
  }): Promise<GenerateSignedDpaResult> {
    throw new BadRequestException(
      'Ownward Labs has not published a Data Processing Agreement for this service.',
    );
  }
}
