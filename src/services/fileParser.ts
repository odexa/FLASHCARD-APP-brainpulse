import * as DocumentPicker from 'expo-document-picker';

export interface ProcessedDocument {
  fileName: string;
  rawText: string;
  estimatedCards: number;
}

export const FileParserService = {
  async pickAndParseDocument(): Promise<ProcessedDocument | null> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
      }

      const file = result.assets[0];
      
      // In a production app, binary documents (PDF, DOCX) are processed via local WASM or backend API parser.
      // Mock parsing step returning extracted text:
      const rawText = `Sample parsed content from ${file.name}.\n\nDefinition 1: Photosynthesis is the process used by plants to convert light energy into chemical energy.\n\nDefinition 2: Mitochondria are known as the powerhouse of the cell generating ATP through respiration.`;

      return {
        fileName: file.name,
        rawText,
        estimatedCards: 4,
      };
    } catch (error) {
      console.error('Error parsing file:', error);
      throw new Error('Failed to parse selected file. Please ensure it is a valid format.');
    }
  },
};