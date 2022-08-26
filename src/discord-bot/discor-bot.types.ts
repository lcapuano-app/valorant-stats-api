export interface BotSlashCommand {
  name: string,
  description: string,

  id?: string,
  application_id?: string,
  version?: string,
  default_permission?: boolean,
  default_member_permissions?: any,
  type?: number,
  dm_permission?: boolean
}
