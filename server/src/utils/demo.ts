import type { Request } from 'express'
import { config } from '../config/env.js'

export function isDemoRequest(req: Request): boolean {
    const hasDemoHeader = !!req.headers['x-demo-user']
    return config.demoMode || (config.nodeEnv !== 'production' && hasDemoHeader)
}
