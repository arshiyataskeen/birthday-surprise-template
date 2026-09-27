import {requireAdmin} from '@/lib/auth';
import Birthday from '../birthday';
export const dynamic='force-dynamic';
export default async function Admin(){await requireAdmin();return <><Birthday admin/><form action="/api/admin/logout" method="post" style={{padding:24,textAlign:'center'}}><button type="submit">Sign out of admin</button></form></>;}
