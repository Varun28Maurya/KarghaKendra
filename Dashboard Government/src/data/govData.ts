
// Mock data for the KarghaKendra Government dashboard.

export interface StatItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  trend: string;
  trendDir: 'up' | 'down';
  icon: string;
}

export const heroStats: StatItem[] = [
{
  id: 'coops',
  label: 'Registered Cooperatives',
  value: '1,284',
  sub: 'Across 14 states',
  trend: '+46 this month',
  trendDir: 'up',
  icon: 'building'
},
{
  id: 'weavers',
  label: 'Active Weavers',
  value: '38,910',
  sub: '61% women artisans',
  trend: '+3.2% vs Q1',
  trendDir: 'up',
  icon: 'users'
},
{
  id: 'production',
  label: 'Fabric Produced (YTD)',
  value: '2.4M m',
  sub: '₹142Cr est. value',
  trend: '+11% YoY',
  trendDir: 'up',
  icon: 'production'
},
{
  id: 'schemes',
  label: 'Scheme Disbursement',
  value: '₹64.8Cr',
  sub: '9 active schemes',
  trend: '+₹8.4Cr this qtr',
  trendDir: 'up',
  icon: 'award'
}];


export const secondaryStats: StatItem[] = [
{
  id: 'pending-verify',
  label: 'Pending Verifications',
  value: '37',
  sub: 'Docs awaiting review',
  trend: '12 urgent',
  trendDir: 'down',
  icon: 'shield'
},
{
  id: 'training',
  label: 'Weavers in Training',
  value: '4,206',
  sub: '18 programs running',
  trend: '+540 enrolled',
  trendDir: 'up',
  icon: 'graduation'
},
{
  id: 'grants',
  label: 'Grants Approved',
  value: '312',
  sub: 'This financial year',
  trend: '+24 this month',
  trendDir: 'up',
  icon: 'wallet'
}];


// Monthly production (metres, in thousands) vs employment (weavers, in thousands)
export const productionEmployment = [
{ month: 'Jan', production: 168, weavers: 33.1 },
{ month: 'Feb', production: 182, weavers: 33.9 },
{ month: 'Mar', production: 205, weavers: 34.8 },
{ month: 'Apr', production: 191, weavers: 35.2 },
{ month: 'May', production: 221, weavers: 36.4 },
{ month: 'Jun', production: 238, weavers: 37.1 },
{ month: 'Jul', production: 252, weavers: 38.9 }];


export interface District {
  id: string;
  name: string;
  state: string;
  coops: number;
  weavers: string;
  output: string;
  growth: number;
}

export const districts: District[] = [
{ id: 'd1', name: 'Varanasi', state: 'Uttar Pradesh', coops: 142, weavers: '6,420', output: '384k m', growth: 14 },
{ id: 'd2', name: 'Kanchipuram', state: 'Tamil Nadu', coops: 118, weavers: '5,190', output: '312k m', growth: 9 },
{ id: 'd3', name: 'Bhagalpur', state: 'Bihar', coops: 96, weavers: '4,010', output: '268k m', growth: 21 },
{ id: 'd4', name: 'Chanderi', state: 'Madhya Pradesh', coops: 74, weavers: '3,140', output: '198k m', growth: -3 },
{ id: 'd5', name: 'Sambalpur', state: 'Odisha', coops: 88, weavers: '3,880', output: '241k m', growth: 6 }];


export interface VerificationItem {
  id: string;
  coop: string;
  district: string;
  doc: string;
  submitted: string;
  priority: 'urgent' | 'normal';
}

export const verificationQueue: VerificationItem[] = [
{ id: 'v1', coop: 'Ganga Weavers Collective', district: 'Varanasi, UP', doc: 'Registration Certificate', submitted: '2h ago', priority: 'urgent' },
{ id: 'v2', coop: 'Kaveri Silk Society', district: 'Kanchipuram, TN', doc: 'GST & Bank Proof', submitted: '5h ago', priority: 'urgent' },
{ id: 'v3', coop: 'Tussar Heritage Guild', district: 'Bhagalpur, BR', doc: 'Member Roster', submitted: '1d ago', priority: 'normal' },
{ id: 'v4', coop: 'Chanderi Warp Union', district: 'Chanderi, MP', doc: 'Loom Audit Report', submitted: '2d ago', priority: 'normal' }];


export interface Scheme {
  id: string;
  name: string;
  beneficiaries: string;
  disbursed: string;
  progress: number;
}

export const schemes: Scheme[] = [
{ id: 's1', name: 'Handloom Weaver Welfare', beneficiaries: '12,430', disbursed: '₹28.6Cr', progress: 78 },
{ id: 's2', name: 'Yarn Subsidy Programme', beneficiaries: '8,190', disbursed: '₹16.2Cr', progress: 64 },
{ id: 's3', name: 'Skill Upgradation Grant', beneficiaries: '4,206', disbursed: '₹11.4Cr', progress: 52 },
{ id: 's4', name: 'Loom Modernisation Aid', beneficiaries: '2,870', disbursed: '₹8.6Cr', progress: 41 }];