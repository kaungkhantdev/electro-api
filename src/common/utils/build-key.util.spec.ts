import { randomUUID } from 'crypto';
import { buildKey } from './build-key.util';

jest.mock('crypto', () => ({
  randomUUID: jest.fn(),
}));

const mockRandomUUID = randomUUID as jest.Mock;

describe('buildKey', () => {
  const mockUUID = '550e8400-e29b-41d4-a716-446655440000';

  beforeEach(() => {
    mockRandomUUID.mockReturnValue(mockUUID);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('without folder', () => {
    it('preserves the file extension', () => {
      expect(buildKey('photo.png')).toBe(`${mockUUID}-photo.png`);
    });

    it('preserves jpg extension', () => {
      expect(buildKey('image.jpg')).toBe(`${mockUUID}-image.jpg`);
    });

    it('converts filename and extension to lowercase', () => {
      expect(buildKey('MyPhoto.PNG')).toBe(`${mockUUID}-myphoto.png`);
    });

    it('replaces spaces in the name with hyphens', () => {
      expect(buildKey('my photo.jpg')).toBe(`${mockUUID}-my-photo.jpg`);
    });

    it('collapses multiple spaces into a single hyphen', () => {
      expect(buildKey('my  photo.jpg')).toBe(`${mockUUID}-my-photo.jpg`);
    });

    it('removes special characters from the name', () => {
      expect(buildKey('file@#$.png')).toBe(`${mockUUID}-file.png`);
    });

    it('trims leading and trailing spaces from the name', () => {
      expect(buildKey('  photo.jpg  ')).toBe(`${mockUUID}-photo.jpg`);
    });
  });

  describe('with folder', () => {
    it('prepends folder with slash separator', () => {
      expect(buildKey('photo.png', 'avatars')).toBe(
        `avatars/${mockUUID}-photo.png`,
      );
    });

    it('applies sanitization rules when folder is provided', () => {
      expect(buildKey('My Photo.JPG', 'uploads')).toBe(
        `uploads/${mockUUID}-my-photo.jpg`,
      );
    });
  });

  describe('uniqueness', () => {
    it('produces different keys on each call due to different UUIDs', () => {
      mockRandomUUID
        .mockReturnValueOnce('uuid-1')
        .mockReturnValueOnce('uuid-2');
      expect(buildKey('photo.png')).not.toBe(buildKey('photo.png'));
    });
  });
});
