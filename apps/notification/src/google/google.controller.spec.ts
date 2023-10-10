import { MailerService } from '@nestjs-modules/mailer';
import { GoogleController } from './google.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { GoogleService } from './google.service';
import { MailService } from '../mail/mail.service';

describe('UserController', () => {
  let ggController: GoogleController;

  let ggServiceMock = {
    googleLogin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleController],
			imports: [
				MailerService
			],
      providers: [
        // MailService,
        {
          provide: GoogleService,
          useValue: ggServiceMock,
        },
      ],
    }).compile();

    ggController = module.get<GoogleController>(GoogleController);
  });

  it('should be defined', () => {
    expect(ggController).toBeDefined();
  });
});
