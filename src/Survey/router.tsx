import NPMSRoutes from './NPMS/router';
import NPMSPlusRoutes from './NPMSPlus/router';
import StandardRoutes from './Standard/router';

export default [...NPMSRoutes, ...NPMSPlusRoutes, ...StandardRoutes];
