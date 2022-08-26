import { Application } from '../declarations';
import users from './users/users.service';
import statsProfile from './stats/profile/stats-profile.service';
import tracker from './tracker/tracker.service';
import statsAgent from './stats/agent/stats-agent.service';
import henrik from './henrik/henrik.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(statsProfile);
  app.configure(tracker);
  app.configure(statsAgent);
  app.configure(henrik);
}
