using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(destinationMember => destinationMember.HostUserName,
                           option => option.MapFrom(
                               sourceMember => sourceMember.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName
                           ));
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(d => d.DislplayName, o => o.MapFrom(s => s.AppUser.DislplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}