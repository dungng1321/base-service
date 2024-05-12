export interface TransporterClientInterface {
  send(pattern: string, data: Record<string, any>): Promise<any>;
}
