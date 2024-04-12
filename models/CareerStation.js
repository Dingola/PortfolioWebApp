'use strict';

export default class CareerStation
{
    constructor(organisation, role, description, organisation_link, acquired_qualification, date_begin, date_end)
    {
        this.organisation = organisation;
        this.role = role;
        this.description = description;
        this.organisation_link = organisation_link;
        this.acquired_qualification = acquired_qualification;
        this.date_begin = date_begin;
        this.date_end = date_end;
    }
}
