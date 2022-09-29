import { Application } from '../declarations';
import users from './users/users.service';
import statsProfile from './stats/profile/stats-profile.service';
import tracker from './tracker/tracker.service';
import statsAgent from './stats/agent/stats-agent.service';
import henrik from './henrik/henrik.service';
import faker from './faker/faker.service';
import status from './status/status.service';
import botQuotes from './bot-quotes/bot-quotes.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(statsProfile);
  app.configure(tracker);
  app.configure(statsAgent);
  app.configure(henrik);
  app.configure(faker);
  app.configure(status);
  app.configure(botQuotes);
}
