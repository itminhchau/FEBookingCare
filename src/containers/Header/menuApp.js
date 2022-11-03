export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.system-user',
        menus: [
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

            { name: 'menu.admin.crud-user', link: '/system/user-manage' },
            { name: 'menu.admin.manage-admin' },
            { name: 'menu.admin.manage-doctor' }
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Phòng khám
        name: 'menu.admin.clinic',
        menus: [

            { name: 'menu.admin.manage-clinic' }
        ]
    },
    { //Chuyên khoa
        name: 'menu.admin.specialty',
        menus: [

            { name: 'menu.admin.manage-specialties' }
        ]
    },
    { //Cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            { name: 'menu.admin.manage-handbook' }
        ]
    },
];