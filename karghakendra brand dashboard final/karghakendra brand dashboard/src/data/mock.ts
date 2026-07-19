
export type Trend = 'up' | 'down';

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  icon: string;
  hint: string;
}

export const kpis: Kpi[] = [
{ id: 'coops', label: 'Verified Cooperatives', value: '142', delta: '+8 this month', trend: 'up', icon: 'coops', hint: 'Across 11 states' },
{ id: 'active', label: 'Active Orders', value: '38', delta: '+5 vs last month', trend: 'up', icon: 'active', hint: '₹42.6L in flight' },
{ id: 'rfq', label: 'Pending RFQs', value: '12', delta: '4 awaiting reply', trend: 'down', icon: 'rfq', hint: 'Avg. response 6h' },
{ id: 'spend', label: 'Monthly Spend', value: '₹18.4L', delta: '+12.5%', trend: 'up', icon: 'spend', hint: 'vs. ₹16.3L in June' },
{ id: 'production', label: 'Orders in Production', value: '21', delta: 'On schedule', trend: 'up', icon: 'production', hint: '3 nearing dispatch' },
{ id: 'completed', label: 'Completed Orders', value: '317', delta: '+24 this quarter', trend: 'up', icon: 'completed', hint: '98.2% on-time' }];


export const procurementData = [
{ month: 'Jan', spend: 11.2, forecast: 11.0 },
{ month: 'Feb', spend: 12.8, forecast: 12.4 },
{ month: 'Mar', spend: 12.1, forecast: 12.9 },
{ month: 'Apr', spend: 14.6, forecast: 14.0 },
{ month: 'May', spend: 15.9, forecast: 15.5 },
{ month: 'Jun', spend: 16.3, forecast: 16.8 },
{ month: 'Jul', spend: 18.4, forecast: 17.6 },
{ month: 'Aug', spend: 17.1, forecast: 18.9 },
{ month: 'Sep', spend: 19.7, forecast: 19.2 },
{ month: 'Oct', spend: 21.2, forecast: 20.6 },
{ month: 'Nov', spend: 22.5, forecast: 22.0 },
{ month: 'Dec', spend: 24.1, forecast: 23.4 }];


export interface StatusSlice {
  name: string;
  value: number;
  color: string;
}

export const orderStatus: StatusSlice[] = [
{ name: 'Pending', value: 12, color: '#C99A52' },
{ name: 'Production', value: 21, color: '#8A4B2A' },
{ name: 'Quality Check', value: 9, color: '#D6C3A5' },
{ name: 'Transit', value: 14, color: '#7F9471' },
{ name: 'Delivered', value: 44, color: '#3B2418' }];


export type OrderState = 'Pending' | 'Production' | 'Quality Check' | 'Transit' | 'Delivered';

export interface Order {
  id: string;
  product: string;
  category: string;
  cooperative: string;
  location: string;
  quantity: string;
  status: OrderState;
  eta: string;
}

export const recentOrders: Order[] = [
{ id: 'KK-4821', product: 'Chanderi Silk Sarees', category: 'Handloom · Silk', cooperative: 'Chanderi Weavers Society', location: 'Madhya Pradesh', quantity: '1,200 pcs', status: 'Production', eta: '24 Jul 2026' },
{ id: 'KK-4820', product: 'Ikat Cotton Yardage', category: 'Handloom · Cotton', cooperative: 'Pochampally Ikat Collective', location: 'Telangana', quantity: '3,500 m', status: 'Quality Check', eta: '21 Jul 2026' },
{ id: 'KK-4817', product: 'Pashmina Shawls', category: 'Fine Wool', cooperative: 'Kashmir Kani Guild', location: 'Jammu & Kashmir', quantity: '480 pcs', status: 'Transit', eta: '19 Jul 2026' },
{ id: 'KK-4813', product: 'Kalamkari Panels', category: 'Hand-block Print', cooperative: 'Srikalahasti Artisans', location: 'Andhra Pradesh', quantity: '900 pcs', status: 'Pending', eta: '02 Aug 2026' },
{ id: 'KK-4808', product: 'Khadi Cotton Kurtas', category: 'Khadi', cooperative: 'Bardoli Khadi Mandal', location: 'Gujarat', quantity: '2,000 pcs', status: 'Delivered', eta: 'Delivered' }];


export interface Cooperative {
  id: string;
  name: string;
  craft: string;
  location: string;
  rating: number;
  members: number;
  capacity: string;
  onTime: number;
  initials: string;
}

export const topCooperatives: Cooperative[] = [
{ id: 'c1', name: 'Chanderi Weavers Society', craft: 'Chanderi Silk', location: 'Madhya Pradesh', rating: 4.9, members: 214, capacity: '1.8k pcs/mo', onTime: 98, initials: 'CW' },
{ id: 'c2', name: 'Pochampally Ikat Collective', craft: 'Ikat Weave', location: 'Telangana', rating: 4.8, members: 168, capacity: '4.2k m/mo', onTime: 96, initials: 'PI' },
{ id: 'c3', name: 'Kashmir Kani Guild', craft: 'Pashmina', location: 'J & K', rating: 4.9, members: 92, capacity: '640 pcs/mo', onTime: 94, initials: 'KK' }];


export type NotifKind = 'rfq' | 'shipment' | 'payment' | 'update';

export interface Notification {
  id: string;
  kind: NotifKind;
  title: string;
  body: string;
  time: string;
}

export const notifications: Notification[] = [
{ id: 'n1', kind: 'rfq', title: 'New RFQ response', body: 'Chanderi Weavers Society quoted ₹6.4L for Silk Sarees.', time: '12m ago' },
{ id: 'n2', kind: 'shipment', title: 'Shipment dispatched', body: 'Order KK-4817 (Pashmina Shawls) is now in transit.', time: '1h ago' },
{ id: 'n3', kind: 'payment', title: 'Payment released', body: '₹4.2L milestone paid to Pochampally Ikat Collective.', time: '3h ago' },
{ id: 'n4', kind: 'update', title: 'Cooperative verified', body: 'Bhujodi Weavers Trust completed KYC & quality audit.', time: '6h ago' },
{ id: 'n5', kind: 'rfq', title: 'RFQ deadline nearing', body: 'Kalamkari Panels RFQ closes in 18 hours.', time: '9h ago' }];