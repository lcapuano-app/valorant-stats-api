
export const getRiotIdTag = ( fullRiotId: string ): { riotId: string, tag: string, err: boolean } => {
  const riotIdTag = fullRiotId?.split('#')?.map( str => str?.trim()?.toLowerCase() );
  const riotId: string = riotIdTag?.[0];
  const tag: string = riotIdTag?.[1];
  const err = !riotId || !tag;

  return { riotId, tag, err };

}
