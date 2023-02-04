import { Controller, Get } from '@nestjs/common';
import { UnProtected } from 'src/decorators/unprotected.decorator';
var pjson = require('../../../package.json')

@Controller()
export class HomeController {
    @Get('healthz')
    @UnProtected()
    public healthz() {
        return {
            success: true,
            version: pjson.version
        }
    }
}
