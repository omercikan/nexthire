package com.nexthire.user.mapper;

import com.nexthire.user.entity.Employer;
import com.nexthire.user.messaging.event.EmployerCreatedEvent;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmployerMapper {

    Employer toEntity(EmployerCreatedEvent event);
}
