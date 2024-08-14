/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (keys, data) => {
    data.forEach((item) => keys.forEach((key) => delete item[key]));
    return data;
};
exports.excludeByProperty = (key, data) => {
    return data.filter((item) => !item.hasOwnProperty(key));
};
exports.sumDeep = (data) => {
    const rlt = [];
    data.forEach((item) => {
        const sum = item.objects.reduce((prev, cur) => cur.val + prev, 0);
        rlt.push({ objects: sum });
    });
    return rlt;
};
exports.applyStatusColor = (rule, data) => {
    let ruleMap = new Map();
    Object.keys(rule).forEach((color) => {
        const statusList = rule[color];
        statusList.forEach((item) => {
            ruleMap.set(item, color);
        });
    });

    const rlt = data
        .filter((item) => ruleMap.get(item.status))
        .map((item) => ({
            ...item,
            color: ruleMap.get(item.status),
        }));

    return rlt;
};
exports.createGreeting = (greetFn, greeting) => {
    return (name) => greetFn(greeting, name);
};
exports.setDefaults = (defaultObj) => {
    return (obj) => Object.assign({ ...defaultObj }, obj);
};
exports.fetchUserByNameAndUsersCompany = (name, services) => {
    const fetchUserCompany = async () => {
        const users = await services.fetchUsers();
        const user = users.find((user) => user.name === name);
        const company = await services.fetchCompanyById(user.companyId);
        return { user, company };
    }
    const promises = [fetchUserCompany(), services.fetchStatus()];

    return new Promise((resolve, reject) => {
        return Promise.all(promises).then(
            (data) => {
                const [userCompany, status] = data;
                resolve({
                    user: userCompany.user,
                    company: userCompany.company,
                    status: status,
                });
            }
        ).catch((e) => {
            reject(e);
        });
    });
};
