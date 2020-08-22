import { post } from './base.js';

export const Notification = {
    send:(data)=>post({data})
}