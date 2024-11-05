export const check_OS_Version = async () => {
    const device: {
        name: string;
        version: string;
    } = {
        name: '',
        version: '',
    };

    if ('userAgentData' in navigator) {
        const navigator_UserAgentData_PlatformVersion = (navigator as any).userAgentData.getHighEntropyValues(['platformVersion']);
        const ua = await navigator_UserAgentData_PlatformVersion;

        if ((navigator as any).userAgentData?.platform === 'Windows') {
            const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0], 10);
            device.name = 'Windows';

            if (majorPlatformVersion >= 13) {
                device.version = '11 or later';
            }
            else if (majorPlatformVersion > 0) {
                device.version = '10';
            }
            else {
                device.version = 'Before 10';
            }
        }
        else if (['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf((navigator as any).userAgentData?.platform || (navigator as any).platform) !== -1) {
            device.name = 'Mac OS';
            device.version = ua.platformVersion || '';
        }
        else if (['iPhone', 'iPad', 'iPod'].indexOf((navigator as any).userAgentData?.platform || (navigator as any).platform) !== -1) {
            device.name = 'iOS';
            const versionMatch = (navigator as any).userAgent.match(/OS (\d+_\d+(_\d+)?)/);
            if (versionMatch) {
                device.version = versionMatch[1].replace(/_/g, '.') || '';
            }
        }
        else if (/Android/.test((navigator as any).userAgent)) {
            device.name = 'Android';
            const versionMatch = (navigator as any).userAgent.match(
                /Android\s([0-9.]*)/
            );
            if (versionMatch) {
                device.version = versionMatch[1] || '';
            }
        }
        else if (/Linux/.test((navigator as any).userAgentData?.platform || (navigator as any).platform)) {
            device.name = 'Linux';
            device.version = '';
        }
        else {
            device.name = '';
            device.version = '';
        }
    }
    else {
        device.name = '';
        device.version = '';
    }

    return device;
};